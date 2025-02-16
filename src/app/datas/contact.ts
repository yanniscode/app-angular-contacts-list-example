export class Contact {  
    constructor(
        public id: number,    
        public prenom: string,    
        public nom: string,    
        public mail: string,
        public telephone: string,  
        public statut: string,  
    ) {}
}

// export class Contact {
//     id: number | undefined;
//     nom: string | undefined;
//     prenom: string | undefined;
//     mail: string | undefined;
//     telephone: string | undefined;
//     statut: string | undefined;
// }

// export interface Contact {
//     id: number;
//     nom: string;
//     prenom: string;
//     mail: string;
//     telephone: string;
//     statut: string;
// }