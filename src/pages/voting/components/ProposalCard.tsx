import { useState } from 'react';
import { Proposal, Vote } from '@/types/voting.types';
import { TimeRemaining } from '@/pages/voting/components/TimeBar';
import { Users, ChevronDown, ChevronUp, Check, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProposalCardProps {
  proposal: Proposal;
  userVote: Vote | null;
  onVote: (proposalId: string) => Promise<void>;
  isVoting: boolean;
}

export function ProposalCard({ proposal, userVote, onVote, isVoting }: ProposalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Compare the proposal ID with the voted proposal ID
  const hasVotedForThis = userVote?.proposalId?._id === proposal._id;

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const getVoteButton = () => {
    // Case 1: Currently submitting a vote for this proposal
    if (isVoting) {
      return (
        <button
          disabled
          className="w-full mt-4 px-6 py-3 rounded-lg font-semibold bg-neutral-800 text-neutral-400 opacity-50 cursor-not-allowed"
        >
          Voting...
        </button>
      );
    }

    // Case 2: Already voted for this proposal
    if (hasVotedForThis) {
      return (
        <div className="w-full mt-4 px-6 py-3 rounded-lg font-semibold bg-green-900/20 text-green-500 border border-green-500/20 flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Voted
        </div>
      );
    }

    // Case 3: Voted for a different proposal
    if (userVote) {
      return (
        <button
          onClick={() => onVote(proposal._id)}
          className="w-full mt-4 px-6 py-3 rounded-lg font-semibold bg-neutral-800 hover:bg-primary text-neutral-400 hover:text-white transition-all duration-200"
        >
          Change Vote
        </button>
      );
    }

    // Case 4: Haven't voted yet
    return (
      <button
        onClick={() => onVote(proposal._id)}
        className="w-full mt-4 px-6 py-3 rounded-lg font-semibold bg-primary hover:bg-primary-dark text-white transition-all duration-200"
      >
        Vote
      </button>
    );
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-neutral-200">
              {proposal.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Round #{proposal.roundId}
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-neutral-400 hover:text-primary transition-colors"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
                <ChevronDown className="w-5 h-5" />
              )}
          </button>
        </div>

        {/* Description */}
        <div className="min-h-[3rem]">
          <p className={cn(
            "text-neutral-300 whitespace-pre-wrap transition-all duration-200",
            !isExpanded && "line-clamp-2"
          )}>
            {proposal.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Total Voters</span>
            </div>
            <p className="text-lg font-semibold text-neutral-200 truncate">
              {proposal.metrics.uniqueVoters}
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1 truncate">
              <Crown className="w-4 h-4 flex-shrink-0" />
              Votes Weight
            </div>
            <p className="text-lg font-semibold text-neutral-200 truncate">
              {formatNumber(proposal.metrics.totalTokensVoted)}
            </p>
          </div>
        </div>

        {/* Time Remaining */}
        <TimeRemaining endDate={proposal.endDate} />

        {/* Vote Button */}
        {getVoteButton()}
      </div>
    </div>
  );
}
