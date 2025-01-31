import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ProposalCard } from './components/ProposalCard';
import { RoundTimer } from './components/TimeBar';
import { api } from '@/api/client';
import { ProposalsResponse, VoteResponse, VoteStatusResponse } from '@/types/voting.types';
import { motion } from 'framer-motion';

export function VotingPage() {
  const queryClient = useQueryClient();
  const [votingProposalId, setVotingProposalId] = useState<string | null>(null);

  // Get both proposals and vote status at once
  const { data: allData, isLoading } = useQuery({
    queryKey: ['voting-data'],
    queryFn: async () => {
      const proposalsResponse = await api.get<ProposalsResponse>('/api/proposals/active');
      const proposals = proposalsResponse.data;

      const roundId = proposals.data.proposals[0]?.roundId;
      const voteStatusResponse = await api.get<VoteStatusResponse>(
        `/api/vote/status/${roundId}`
      );
      const voteStatus = voteStatusResponse.data;

      return {
        proposals,
        voteStatus
      };
    }
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async (proposalId: string) => {
      const response = await api.post<VoteResponse>('/api/vote', {
        proposalId,
      });
      return response.data;
    },
    onMutate: async (newProposalId) => {
      setVotingProposalId(newProposalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voting-data'] });
    },
    onError: (error) => {
      console.error('Failed to vote:', error);
    },
    onSettled: () => {
      setVotingProposalId(null);
    }
  });

  const handleVote = async (proposalId: string) => {
    try {
      await voteMutation.mutateAsync(proposalId);
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  if (isLoading || !allData) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex">
            <Sidebar />
            <main className="flex-1 bg-neutral-950 flex items-center justify-center">
              <div className="text-neutral-400">Loading proposals...</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const { proposals, voteStatus } = allData;
  const activeProposals = proposals.data.proposals;
  const roundEndDate = activeProposals[0]?.endDate;
  const roundId = activeProposals[0]?.roundId;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Sidebar />
          <main className="flex-1 bg-neutral-950">
            <div className="p-6">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Page Title */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl"
                >
                  <h1 className="text-4xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                    Active Proposals
                  </h1>
                  <p className="text-neutral-400 mt-2">
                    Vote on the future of AI agents. Your tokens = Your voice.
                  </p>
                </motion.div>

                {/* Round Timer */}
                {roundEndDate && roundId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <RoundTimer 
                      endDate={roundEndDate} 
                      roundId={roundId}
                    />
                  </motion.div>
                )}

                {/* Proposals Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {activeProposals.map((proposal) => (
                    <ProposalCard
                      key={proposal._id}
                      proposal={proposal}
                      userVote={voteStatus.data.vote}
                      onVote={handleVote}
                      isVoting={votingProposalId === proposal._id}
                    />
                  ))}
                </motion.div>

                {/* Empty State */}
                {activeProposals.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center py-12"
                  >
                    <p className="text-neutral-400">No active proposals at the moment.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
