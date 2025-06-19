import { NextResponse } from 'next/server';
import axios from 'axios';


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }
  if (!API_URL) {
    return NextResponse.json({ error: 'Invalid api-url on environment.' }, { status: 400 });
  }

  // 🚀 NEW: Build the rest of the query params
  const forwardedSearchParams = new URLSearchParams(searchParams);
  forwardedSearchParams.delete('path'); // remove 'path' itself
  const queryString = forwardedSearchParams.toString(); // like "limit=2&page=3"

  // 🚀 NEW: Build full backend URL
  const apiUrl = `${API_URL}${path}${queryString ? `&${queryString}` : ''}`;

  try {
    const cookie = request.headers.get('cookie') || '';

    const response = await axios.get(apiUrl, {
      headers: {
        'Cookie': cookie,
      },
      withCredentials: true,
    });

    const setCookie = response.headers['set-cookie'];

    const nextRes = NextResponse.json(response.data);
    if (setCookie) {
      nextRes.headers.set('Set-Cookie', setCookie.toString());
    }

    return nextRes; 
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.response ? error.response.status : 500 }
    );
  }
}


// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const path = searchParams.get('path');
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const apiUrl = `${API_URL}${path}`;
  
//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//           'Content-Type': 'application/json',
//         // 'Authorization': `token ${process.env.NEXT_PUBLIC_ERP_NEXT_API_KEY}:${process.env.NEXT_PUBLIC_ERP_NEXT_API_SECRET}`,
//       },
//     });
//     return NextResponse.json(response.data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: error.response ? error.response.status : 500 }
//     );
//   }
// }

