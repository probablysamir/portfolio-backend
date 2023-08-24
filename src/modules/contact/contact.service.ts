import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ContactDto } from './contact.dto';
import { EMAIL } from 'src/constants';

@Injectable()
export class ContactService {
  constructor() {}
  async sendEmail(contactDto: ContactDto) {
    const APIkey = EMAIL.sendgridKey;
    sgMail.setApiKey(APIkey);
    const msg = {
      to: EMAIL.toEmail, // Change to your recipient
      from: EMAIL.fromEmail, // Change to your verified sender
      subject: 'Contact Us',
      html: `<html>
        <head>
            <title>Contact Us Email</title>
            <style>
                /* CSS styles for your email design */
                body {
                    font-family: Arial, sans-serif;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                
                h1 {
                    color: #333333;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                
                p {
                    color: #666666;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>The following person tried to contact you:</h1>
                <p><strong>Name: </strong>${contactDto.name}</p>
                <p><strong>Email: </strong>${contactDto.email}</p>
                <p><strong>Message: </strong>${contactDto.message}</p>
            </div>
        </body>
        </html>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        return {
          success: true,
          message: 'Email sent successfully',
        };
      })
      .catch((error) => {
        console.error(error);
        return {
          success: false,
          message: 'Failed to send email',
        };
      });
    return {
      success: true,
      message: 'Email sent successfully',
    };
  }
}
