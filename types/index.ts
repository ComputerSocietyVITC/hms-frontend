export interface User {
  authId: string;
  college: string;
  createdAt: string;
  github: string | null;
  id: string;
  imageId: string | null;
  isLeader: boolean;
  name: string;
  phone: string;
  regNum: string;
  role: "ADMIN" | "EVALUATOR" | "SUPER_ADMIN" | "USER";
  teamId: string | null;
  updatedAt: string;
}

export interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string;
  members: User[];
  project: Project;
}

export interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
  userId: string;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  evaluations: Evaluation[];
}
