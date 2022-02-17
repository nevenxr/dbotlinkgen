import { PermissionInteger, PermissionKeys } from "..";

export const Scopes = {
    bot: "bot",
    applicationsCommands: "applications.commands"
};

export type ScopeKeys = keyof (typeof Scopes);

export class BotURL {
    private readonly url!: string;
    private client_id: string | null = null;
    public permissions: number = 0;
    public scope: string[] | string = [];

    constructor() {
        Object.defineProperty(this, "url", { value: "https://discord.com/api/oauth2/authorize", enumerable: false });
        
    };

    /**
     * Sets the id of the client
     * @param {string} clientId [id] of client
     * @returns {BotURL}
     */
    setClient(clientId: string): BotURL {
        this.client_id = clientId;

        return this;
    };

    /**
     * Sets the scopes to the url
     * @param {ScopeKeys | ScopeKeys[]} scp [Scopes] to add (supports array)
     * @returns {BotURL}
     */
    setScopes (scp: ScopeKeys | ScopeKeys[]): BotURL {
        if (Array.isArray(scp)) {
            
            scp.forEach((s) => {
                if (Scopes[s]) {
                    (this.scope as string[]).push(Scopes[s]);
                } else throw new TypeError("Scope key is not valid.");
            });

        } else {
            if (Scopes[scp]) {
                this.scope = Scopes[scp];

            } else throw new TypeError("Scope key is not valid.");
        };

        return this;
    };

    /**
     * Adds permission to the current ones.
     * @param {PermissionKeys} perm [key] Permission to add
     * @returns {BotURL}
     */
    addPermission(perm: PermissionKeys): BotURL {
        if (typeof (perm) !== "string") throw new TypeError("Permission key must be a string.");

        if (PermissionInteger[perm]) {
            if (this.has(perm)) throw new TypeError(`Permission (${perm}) is already added - Don't repeat it!`);
            this.permissions += (PermissionInteger[perm]) as number;

            return this;
        } else throw new TypeError("Permission key is not valid.");
    };

    /**
     * Adds permissions to the current ones.
     * @param {PermissionKeys[]} perm [keys] Permissions to add
     * @returns {BotURL}
     */
    addPermissions(perm: PermissionKeys[]): BotURL {
        if (!Array.isArray(perm)) throw new TypeError("Permission keys must be an array.");

        for (let i = 0; i < perm.length; i++) {
            if (PermissionInteger[perm[i]]) {
                if (this.has(perm[i])) throw new TypeError(`Permission (${perm[i]}) is already added - Don't repeat it!`);

                this.permissions += (PermissionInteger[perm[i]]) as number;
            };
        };

        return this;
    };

    /**
     * Checks whether the permission has a bit.
     * @param {PermissionKeys} perm Key permission to check
     * @returns {boolean}
     */
    has (perm: PermissionKeys): boolean {

        if (typeof (perm) === "string") {
            if (!PermissionInteger[perm]) throw new TypeError("Permission key is not valid.");

            return (this.permissions & PermissionInteger[perm] as number) === PermissionInteger[perm];
        } else throw new TypeError("Permission key must be a string.");

    };

    /**
     * Creates the invite link of the client
     * @returns {string}
     */
    create (): string {
        var url = this.url;

        if (this.client_id) {
            url += "?client_id=" + this.client_id;
        } else throw new TypeError("Client must not be undefined");

        if (typeof (this.permissions) === "number" || this.permissions !== 0) {
            url += "&permissions=" + this.permissions;
        };

        if (this.scope && this.scope.length) {
            url += "&scope=";

            var bot = false;
            var f = false;

            if (Array.isArray(this.scope)) {
                this.scope.forEach((s) => {

                    if (s === "bot") {
                        bot = true;
                    };
                    
                    if (!f) {
                        url += s;
                        f = true;
                    } else {
                        url += "+" + s;
                    };
                });
            } else if (typeof (this.scope) === "string") {
                url += this.scope;

                f = true;
            };
        };

        return url;
    };
};