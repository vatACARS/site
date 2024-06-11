export interface VatsimUserData {
    data: {
        cid: string;
        personal: {
            name_first: string;
            name_last: string;
            name_full: string;
            email: string;
        }
        vatsim: {
            rating: {
                id: number;
                long: string;
                short: string;
            }
            pilotrating: {
                id: number;
                long: string;
                short: string;
            }
            division: {
                id: string;
                name: string;
            }
            region: {
                id: string;
                name: string;
            }
            subdivision: {
                id: string | null;
                name: string | null;
            }
        }
        oauth: {
            token_valid: string;
        }
    }
}

interface DiscordLink {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
}

export interface AuthTokenLink {
    token: string;
    created: Date;
    expires: Date;
}

export interface VatACARSUserData {
    data: {
        authorised: true;
        cid: string;
        name_first: string;
        name_last: string;
        email: string;
        rating: {
            id: number;
            short: string;
            long: string;
        }
        division: {
            id: string;
            name: string;
        }
        region: {
            id: string;
            name: string;
        }
        subdivision: {
            id: string;
            name: string;
        },
        discord: DiscordLink | null,
        authToken: AuthTokenLink[] | []
    }
}

export interface VatACARSUnauthorisedUser {
    data: {
        authorised: false;
    }
}