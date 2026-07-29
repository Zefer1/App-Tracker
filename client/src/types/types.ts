export type Application = {
  id: string;
  company: string;
  position: string;
  status: string;
  link: string | null;
  notes: string | null;
  applied_at: string;
  updated_at: string;
  created_at: string;
  user_id: string;
};

export type User = {
  user_id: string;
  name: string;
  password: string;
  email: string;
  created_at: string;
}