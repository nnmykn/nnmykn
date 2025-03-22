import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic認証のユーザー名とパスワード
const userNameConfig = process.env.BASIC_AUTH_USERNAME || 'admin'
const passwordConfig = process.env.BASIC_AUTH_PASSWORD || 'admin'

// ミドルウェアの設定: 特定パスのみに適用
export const config = {
  matcher: ['/calendar/:path*', '/editor/:path*'],
}

export function middleware(req: NextRequest) {
  // 認証済みクッキーの確認
  const authCookie = req.cookies.get('authenticated')

  if (authCookie?.value === 'true') {
    return NextResponse.next()
  }

  // 認証情報が設定されていない場合は次の処理へ
  if (userNameConfig === undefined || passwordConfig === undefined) {
    return NextResponse.next()
  }

  // Authorizationヘッダの取得
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    // ヘッダからユーザー名とパスワードをデコード
    const authValue = basicAuth.split(' ')[1]
    const [username, password] = Buffer.from(authValue, 'base64')
      .toString()
      .split(':')

    // ユーザー名とパスワードの検証
    if (username === userNameConfig && password === passwordConfig) {
      // 認証成功時にクッキーを設定
      const response = NextResponse.next()
      response.cookies.set('authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24時間
      })
      return response
    }
  }
  return new NextResponse('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
