export interface Person {
  id: number;  
  name: string;
  email: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface PersonCreate {
  name: string;
  email: string;
  note: string;
}
