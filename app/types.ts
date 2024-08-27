export interface EventList {
    id: number;
    date: string;
    name: string;
    members?: string[] | undefined;
}

export type StandList = {
    id: number;
    created_at: string;
    underwriter: string;
    name: string;
    category: 'food' | 'gas' | 'hotel' | 'ticket';
    members?: string[];
    amount: number;
}

export interface DropDown {
    name: string;
    icon?: string;
}