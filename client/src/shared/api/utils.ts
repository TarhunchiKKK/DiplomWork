export class HttpHeadersBuilder {
    private headers: Record<string, any> = {};

    public setBearerToken(token: string | null): this {
        if (token) {
            this.headers.Authorization = `Bearer ${token}`;
        } else {
            delete this.headers.Authorization;
        }
        return this;
    }

    public get() {
        return this.headers;
    }
}
