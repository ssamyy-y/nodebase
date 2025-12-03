"use client";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutBtn } from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

const Page = () => {
  // await requireAuth();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI job queued");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    })
  );

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        testai
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        create workflow
      </Button>
      <LogoutBtn />
    </div>
  );
};

export default Page;
