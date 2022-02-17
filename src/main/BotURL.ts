import { PermissionInteger, PermissionKeys } from "..";

export const Scopes = {
    bot: "bot",
    applicationsCommands: "applications.commands"
};

export type ScopeKeys = keyof (typeof Scopes);

export class BotURL {
    private readonly url!: string;
    public clientId: string | null = null;
    public guildId: string | null = null;
    public disabledSelect = false;
    public permissions: number = 0;
    public scope: string[] | string = [];

    constructor() {
        Object.defineProperty(this, "url", { value: "https://discord.com/api/oauth2/authorize", enumerable: false });
        
    };

    /**
     * Sets the id of the client
     * @param {string} clientId id of the client
     * @returns {BotURL}
     */
    setClient(clientId: string): BotURL {
        this.clientId = clientId;

        return this;
    };

    /**
     * Sets the guildId for preselected in the dialog 
     * only if the user has permission.
     * @param {string} guildId id of the guild
     * @returns {BotURL}
     */
    setGuild (guildId: string): BotURL {
        this.guildId = guildId;

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
            if (this.hasPermission(perm)) throw new TypeError(`Permission (${perm}) is already added - Don't repeat it!`);
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
                if (this.hasPermission(perm[i])) throw new TypeError(`Permission (${perm[i]}) is already added - Don't repeat it!`);

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
    hasPermission (perm: PermissionKeys): boolean {

        if (typeof (perm) === "string") {
            if (!PermissionInteger[perm]) throw new TypeError("Permission key is not valid.");

            return (this.permissions & PermissionInteger[perm] as number) === PermissionInteger[perm];
        } else throw new TypeError("Permission key must be a string.");

    };

    /**
     * Disallow the user from picking a different guild.
     * @param {boolean} option [boolean] true for disabled
     */
    disableSelect (option: boolean): BotURL {
        if (typeof (option) === "boolean") {
            this.disabledSelect = option;
    
            return this;
        } else throw new TypeError("The disableOption parameter must be a boolean.");
    };

    /**
     * Creates the invite link of the client
     * @returns {string}
     */
    create (): string {
        var url = this.url;

        if (this.clientId) {
            url += "?client_id=" + this.clientId;
        } else throw new TypeError("Client id must not be undefined");

        if (typeof (this.permissions) === "number" || this.permissions !== 0) {
            url += "&permissions=" + this.permissions;
        };

        if (this.guildId) {
            url += "&guild_id=" + this.guildId
        };

        if (this.disabledSelect === true) {
            url += "&disable_guild_select=" + this.disabledSelect;
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