export class HttpHeadersBuilder {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private headers: Record<string, any> = {};

    public setBearerToken(token: string | null): this {
        if (token) {
            this.headers.Authorization = `Bearer ${token}`;
        } else {
            delete this.headers.Authorization;
        }
        return this;
    }

    public build() {
        return this.headers;
    }
}
