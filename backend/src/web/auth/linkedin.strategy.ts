import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as querystring from 'querystring';

config();
@Injectable()
export class LinkedInStrategy {
  async generateAuthUrl(state: string): Promise<string> {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${querystring.stringify(
      {
        response_type: 'code',
        client_id: process.env.LINKEDIN_CLIENT_ID,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URL,
        state,
        scope: 'openid profile email',
      },
    )}`;
    return authUrl;
  }

  async handleCallback(code: string): Promise<any> {
    // get access token
    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URL,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    });

    const tokenResponse = await fetch(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      },
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // get user data
    const profile = await fetch('https://api.linkedin.com/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const profiles = await profile.json();
    const user = profiles;
    return user;
  }
}
