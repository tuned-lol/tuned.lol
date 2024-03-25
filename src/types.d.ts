export interface GoogleUser {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  at_hash?: string;
  azp?: string;
  email: string;
  email_verified?: string;
  family_name?: string;
  given_name: string;
  hd?: string;
  locale?: string;
  name: string;
  nonce?: string;
  picture: string;
  profile?: string;
}
