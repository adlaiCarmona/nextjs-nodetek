/*
Can be accesed by any:
/api/auth/login
/api/auth/logout
/api/auth/**
*/

import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth();