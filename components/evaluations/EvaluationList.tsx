import { cn } from "@/lib/utils";
import { Evaluation } from "@/types";
import React, { useState } from "react";
import EvaluationListItem from "./EvaluationListItem";
import api from "@/api";
import axios from "axios";
import Error from "../ui/Error";

interface EvaluationListProps {
  projectId: string;
  currentUserId: string;
  evaluations: Evaluation[] | [];
  className?: string;
}

const EvaluationList = ({
  projectId,
  currentUserId,
  evaluations: initialEvaluations,
  className,
}: EvaluationListProps) => {
  const [evaluations, setEvaluations] =
    useState<Evaluation[]>(initialEvaluations);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteEvaluation = async (id: string) => {
    try {
      const response = await api.delete(`/evaluation/${projectId}`);

      if (response.status === 200) {
        setEvaluations(
          evaluations.filter((evaluation) => evaluation.id !== id)
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 403:
              setErrorMessage(
                "You don't have permissions to delete this evaluation"
              );
              break;
            case 404:
              setErrorMessage("Evaluation not found");
              break;
            case 500:
              setErrorMessage("Server error. Please try again later");
              break;
            default:
              setErrorMessage("An unexpected error occurred");
          }
        }
      }
    }
  };

  if (errorMessage) {
    return <Error error={errorMessage} />;
  }

  return (
    <div className={cn("w-[50%] space-y-4 my-8", className)}>
      <h2 className="text-2xl font-bold text-white mb-4">Evaluations</h2>
      <div className="space-y-2">
        {evaluations.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            No evaluations available
          </div>
        ) : (
          evaluations.map((evaluation: Evaluation) => (
            <EvaluationListItem
              key={evaluation.id}
              evaluation={evaluation}
              onDelete={handleDeleteEvaluation}
              canDelete={evaluation.userId === currentUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EvaluationList;
