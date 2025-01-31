import { useState } from 'react';
import { Proposal, Vote } from '@/types/voting.types';
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
  const hasVotedForThis = userVote?.proposalId?._id === proposal._id;

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const getVoteButton = () => {
    if (isVoting) {
      return (
        <button
          disabled
          className="w-full px-6 py-3 rounded-lg font-semibold bg-neutral-800 text-neutral-400 opacity-50 cursor-not-allowed"
        >
          Voting...
        </button>
      );
    }

    if (hasVotedForThis) {
      return (
        <div className="w-full px-6 py-3 rounded-lg font-semibold bg-green-900/20 text-green-500 border border-green-500/20 flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Voted
        </div>
      );
    }

    if (userVote) {
      return (
        <button
          onClick={() => onVote(proposal._id)}
          className="w-full px-6 py-3 rounded-lg font-semibold bg-neutral-800 hover:bg-primary text-neutral-400 hover:text-white transition-all duration-200"
        >
          Change Vote
        </button>
      );
    }

    return (
      <button
        onClick={() => onVote(proposal._id)}
        className="w-full px-6 py-3 rounded-lg font-semibold bg-primary hover:bg-primary-dark text-white transition-all duration-200"
      >
        Vote
      </button>
    );
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Header - Fixed Height */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-h-[4rem]">
            <h3 className="text-xl font-semibold text-neutral-200 line-clamp-1">
              {proposal.title}
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-neutral-400 hover:text-primary transition-colors flex-shrink-0"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Description - Fixed Height */}
        <div className="min-h-[4.5rem] mb-6">
          <p className={cn(
            "text-neutral-300 whitespace-pre-wrap transition-all duration-200",
            !isExpanded && "line-clamp-3"
          )}>
            {proposal.description}
          </p>
        </div>

        {/* Metrics - Fixed Height */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Total Voters</span>
            </div>
            <p className="text-lg font-semibold text-neutral-200">
              {proposal.metrics.uniqueVoters}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
              <Crown className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Votes Weight</span>
            </div>
            <p className="text-lg font-semibold text-neutral-200">
              {formatNumber(proposal.metrics.totalTokensVoted)}
            </p>
          </div>
        </div>

        {/* Vote Button - Always at Bottom */}
        <div className="mt-auto">
          {getVoteButton()}
        </div>
      </div>
    </div>
  );
}
