import { serverEnv } from "@/lib/env";

// HackMD API関連の型定義
export interface HackMDNote {
  id: string;
  title: string;
  content: string;
  lastChangedAt: string;
  lastChangeUser: {
    name: string;
    photo: string;
    biography: string;
    email: string;
  };
  createdAt: string;
  publishType: string;
  permalink: string;
  readPermission: string;
  writePermission: string;
}

export interface UpdateNoteData {
  title: string;
  content: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  readPermission?: string;
  writePermission?: string;
}

// サーバーサイドのAPI関数
export const serverApi = {
  /**
   * ノート一覧を取得 (サーバーサイド)
   */
  getNotes: async (): Promise<HackMDNote[]> => {
    const response = await fetch(`${serverEnv.HACKMD_API_BASE_URL}/notes`, {
      headers: {
        'Authorization': `Bearer ${serverEnv.HACKMD_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('ノート一覧の取得に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * 特定のノートを取得 (サーバーサイド)
   */
  getNote: async (id: string): Promise<HackMDNote> => {
    const response = await fetch(`${serverEnv.HACKMD_API_BASE_URL}/notes/${id}`, {
      headers: {
        'Authorization': `Bearer ${serverEnv.HACKMD_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('ノートの取得に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * 新規ノートを作成 (サーバーサイド)
   */
  createNote: async (data: CreateNoteData): Promise<HackMDNote> => {
    const response = await fetch(`${serverEnv.HACKMD_API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serverEnv.HACKMD_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        readPermission: data.readPermission || 'owner',
        writePermission: data.writePermission || 'owner',
      }),
    });
    
    if (!response.ok) {
      throw new Error('ノートの作成に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * ノートを更新 (サーバーサイド)
   */
  updateNote: async (id: string, data: UpdateNoteData): Promise<HackMDNote> => {
    const response = await fetch(`${serverEnv.HACKMD_API_BASE_URL}/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${serverEnv.HACKMD_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('ノートの更新に失敗しました');
    }
    
    return response.json();
  },
};

// クライアントサイドのAPI関数
export const hackmdApi = {
  /**
   * ノート一覧を取得 (クライアントサイド)
   */
  getNotes: async (): Promise<HackMDNote[]> => {
    const response = await fetch('/api/hackmd/notes');
    
    if (!response.ok) {
      throw new Error('ノート一覧の取得に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * 特定のノートを取得 (クライアントサイド)
   */
  getNote: async (id: string): Promise<HackMDNote> => {
    const response = await fetch(`/api/hackmd/notes/${id}`);
    
    if (!response.ok) {
      throw new Error('ノートの取得に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * 新規ノートを作成 (クライアントサイド)
   */
  createNote: async (data: CreateNoteData): Promise<HackMDNote> => {
    const response = await fetch('/api/hackmd/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        readPermission: data.readPermission || 'owner',
        writePermission: data.writePermission || 'owner',
      }),
    });
    
    if (!response.ok) {
      throw new Error('ノートの作成に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * ノートを更新 (クライアントサイド)
   */
  updateNote: async (id: string, data: UpdateNoteData): Promise<HackMDNote> => {
    const response = await fetch(`/api/hackmd/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('ノートの更新に失敗しました');
    }
    
    return response.json();
  },
}; 