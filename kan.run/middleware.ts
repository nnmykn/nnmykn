import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic認証のユーザー名とパスワード
const USERNAME = process.env.BASIC_AUTH_USERNAME || 'admin'
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'password'

// 保護するパス
const PROTECTED_PATHS = ['/calendar', '/editor']

export function middleware(request: NextRequest) {
  // リクエストのパスを取得
  const path = request.nextUrl.pathname

  // 保護対象のパスかどうかチェック
  const isProtectedPath = PROTECTED_PATHS.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(`${protectedPath}/`),
  )

  // 保護対象でなければ何もしない
  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // Basic認証のヘッダーを取得
  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    // Basic認証のヘッダーを解析
    const encodedCredentials = authHeader.split(' ')[1]
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      'base64',
    ).toString()
    const [username, password] = decodedCredentials.split(':')

    // 認証情報が正しい場合は次のミドルウェアやルートハンドラに進む
    if (username === USERNAME && password === PASSWORD) {
      return NextResponse.next()
    }
  }

  // 認証失敗時はBasic認証を要求するレスポンスを返す
  const response = new NextResponse('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Area"',
    },
  })

  return response
}

// どのパスに対してミドルウェアを実行するかを指定
export const config = {
  matcher: ['/calendar/:path*', '/editor/:path*'],
}
