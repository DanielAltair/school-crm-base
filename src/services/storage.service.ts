/** Servicio genérico para gestionar colecciones persistentes en LocalStorage. */
export class StorageService<T> {
    private readonly key: string;

    constructor(key: string) {
        this.key = key;
    }

    /** Recupera los elementos guardados; devuelve una colección vacía si no hay datos válidos. */
    public getAll(): T[] {
        const data = localStorage.getItem(this.key);
        if (data === null) return [];

        try {
            const parsed: unknown = JSON.parse(data);
            return Array.isArray(parsed) ? parsed as T[] : [];
        } catch {
            return [];
        }
    }

    /** Guarda la colección completa. */
    public saveAll(items: T[]): void {
        localStorage.setItem(this.key, JSON.stringify(items));
    }

    /** Añade un elemento a la colección existente. */
    public add(item: T): void {
        const items = this.getAll();
        items.push(item);
        this.saveAll(items);
    }
}

