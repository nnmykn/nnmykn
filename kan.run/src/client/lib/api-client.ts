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

// API Clientの実装
export const hackmdApi = {
  /**
   * ノート一覧を取得
   */
  getNotes: async (): Promise<HackMDNote[]> => {
    const response = await fetch('/api/hackmd/notes');
    
    if (!response.ok) {
      throw new Error('ノート一覧の取得に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * 特定のノートを取得
   */
  getNote: async (id: string): Promise<HackMDNote> => {
    const response = await fetch(`/api/hackmd/notes/${id}`);
    
    if (!response.ok) {
      throw new Error('ノートの取得に失敗しました');
    }
    
    return response.json();
  },
  
  /**
   * 新規ノートを作成
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
   * ノートを更新
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