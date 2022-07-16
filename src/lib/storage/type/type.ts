export interface Storage {
    rename(item: StorageRename): Promise<void>;
    move(item: StorageMove): Promise<void>;
    delete(item: StorageDelete): Promise<void>;
}

export interface StorageMove {
    path_from: string;
    path_to: string;
    filename: string;
}

export interface StorageRename {
    path_old: string;
    path_new: string;
}

export interface StorageDelete {
    path: string;
    filename: string;
}
