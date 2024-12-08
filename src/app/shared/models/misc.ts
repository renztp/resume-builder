export interface Interests {
  title: string;
}

export interface References {
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export interface Misc {
  interests: Interests[];
  references: References[];
}