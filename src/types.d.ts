export type postStudent = {
  nif: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  degree: string;
  course: string[];
}

export type putStudent = {
  nif: string;
  name?: string;
  surname?: string;
  age?: number;
  email?: string;
  degree?: string;
  course?: string[];
}