// ================ USER (AppUser) ТИПИ ================
export interface AppUserShortDTO {
    id: string;
    username: string; // fullName або username
}
export interface AppUserFullDTO extends AppUserShortDTO {
    email?: string;
    role?: string;
}
