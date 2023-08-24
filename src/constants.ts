import * as dotenv from 'dotenv';
dotenv.config();

export const DATABASE = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

export const JWT = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const EMAIL = {
  sendgridKey: process.env.SENDGRID_KEY,
  fromEmail: process.env.SENDGRID_MAIL,
  toEmail: process.env.CONTACT_MAIL,
};
