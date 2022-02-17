"use strict"
const PermissionInteger = {
    "CREATE_INSTANT_INVITE": 0x1,
    "KICK_MEMBERS": 0x2,
    "BAN_MEMBERS": 0x4,
    "ADMINISTRATOR": 0x8,
    "MANAGE_CHANNELS": 0x10,
    "MANAGE_GUILD": 0x20,
    "ADD_REACTIONS": 0x40,
    "VIEW_AUDIT_LOG": 0x80,
    "PRIORITY_SPEAKER": 0x100,
    "STREAM": 0x200,
    "VIEW_CHANNEL": 0x400,
    "SEND_MESSAGES": 0x800,
    "SEND_TTS_MESSAGES": 0x1000,
    "MANAGE_MESSAGES": 0x2000,
    "EMBED_LINKS": 0x4000,
    "ATTACH_FILES": 0x8000,
    "READ_MESSAGE_HISTORY": 0x10000,
    "MENTION_EVERYONE": 0x20000,
    "USE_EXTERNAL_EMOJIS": 0x40000,
    "VIEW_GUILD_INSIGHTS": 0x80000,
    "CONNECT": 0x100000,
    "SPEAK": 0x200000,
    "MUTE_MEMBERS": 0x400000,
    "DEAFEN_MEMBERS": 0x800000,
    "MOVE_MEMBERS": 0x1000000,
    "USE_VAD": 0x2000000,
    "CHANGE_NICKNAME": 0x4000000,
    "MANAGE_NICKNAMES": 0x8000000,
    "MANAGE_ROLES": 0x10000000,
    "MANAGE_WEBHOOKS": 0x20000000,
    "MANAGE_EMOJIS_AND_STICKERS": 0x40000000,
    "USE_APPLICATION_COMMANDS": 0x80000000,
    "REQUEST_TO_SPEAK": 0x100000000,
    "MANAGE_EVENTS": 0x200000000,
    "MANAGE_THREADS": 0x400000000,
    "CREATE_PUBLIC_THREADS": 0x800000000,
    "CREATE_PRIVATE_THREADS": 0x1000000000,
    "USE_EXTERNAL_STICKERS": 0x2000000000,
    "SEND_MESSAGES_IN_THREADS": 0x4000000000,
    "START_EMBEDDED_ACTIVITIES": 0x8000000000,
    "MODERATE_MEMBERS": 0x10000000000
}
const Scopes = {
    bot: "bot",
    applicationsCommands: "applications.commands"
}
class BotURL {
    url
    clientId = null
    guildId = null
    disabledSelect = false
    permissions = 0
    scope = []
    constructor() {
        Object.defineProperty(this, "url", { value: "https://discord.com/api/oauth2/authorize", enumerable: false })
    }
    
    setClient(clientId) {
        this.clientId = clientId
        return this
    }
    

    setGuild(guildId) {
        this.guildId = guildId
        return this
    }
    

    setScopes(scp) {
        if (Array.isArray(scp)) {
            scp.forEach((s) => {
                if (Scopes[s]) {
                    this.scope.push(Scopes[s])
                }
                else
                    throw new TypeError("Scope key is not valid.")
            })
        }
        else {
            if (Scopes[scp]) {
                this.scope = Scopes[scp]
            }
            else
                throw new TypeError("Scope key is not valid.")
        }
        
        return this
    }
    

    addPermission(perm) {
        if (typeof (perm) !== "string")
            throw new TypeError("Permission key must be a string.")
        if (PermissionInteger[perm]) {
            if (this.hasPermission(perm))
                throw new TypeError(`Permission (${perm}) is already added - Don't repeat it!`)
            this.permissions += (PermissionInteger[perm])
            return this
        }
        else
            throw new TypeError("Permission key is not valid.")
    }
    

    addPermissions(perm) {
        if (!Array.isArray(perm))
            throw new TypeError("Permission keys must be an array.")
        for (let i = 0; i < perm.length; i++) {
            if (PermissionInteger[perm[i]]) {
                if (this.hasPermission(perm[i]))
                    throw new TypeError(`Permission (${perm[i]}) is already added - Don't repeat it!`)
                this.permissions += (PermissionInteger[perm[i]])
            }
            
        }
        
        return this
    }
    

    hasPermission(perm) {
        if (typeof (perm) === "string") {
            if (!PermissionInteger[perm])
                throw new TypeError("Permission key is not valid.")
            return (this.permissions & PermissionInteger[perm]) === PermissionInteger[perm]
        }
        else
            throw new TypeError("Permission key must be a string.")
    }
    

    disableSelect(option) {
        if (typeof (option) === "boolean") {
            this.disabledSelect = option
            return this
        }
        else
            throw new TypeError("The disableOption parameter must be a boolean.")
    }
    

    create() {
        var url = this.url
        if (this.clientId) {
            url += "?client_id=" + this.clientId
        }
        else
            throw new TypeError("Client id must not be undefined")
        if (typeof (this.permissions) === "number" || this.permissions !== 0) {
            url += "&permissions=" + this.permissions
        }
        
        if (this.guildId) {
            url += "&guild_id=" + this.guildId
        }
        
        if (this.disabledSelect === true) {
            url += "&disable_guild_select=" + this.disabledSelect
        }
        
        if (this.scope && this.scope.length) {
            url += "&scope="
            var bot = false
            var f = false
            if (Array.isArray(this.scope)) {
                this.scope.forEach((s) => {
                    if (s === "bot") {
                        bot = true
                    }
                    
                    if (!f) {
                        url += s
                        f = true
                    }
                    else {
                        url += "+" + s
                    }
                    
                })
            }
            else if (typeof (this.scope) === "string") {
                url += this.scope
                f = true
            }
            
        }
        
        return url
    }
    
}

