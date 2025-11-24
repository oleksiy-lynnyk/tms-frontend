// ================ USER (AppUser) ТИПИ ================
export interface AppUserShortDTO {
    id: string;
    username: string; // fullName або username
}
export interface AppUserFullDTO extends AppUserShortDTO {
    fullName?: string;
    email?: string;
    role?: string;
}
