import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { UpdateUserDTO } from "src/users/dto/update-user.dto";

export const updateUserSwagger = {
    tags: ['users'],
    operation: {
        summary: 'Mettre à jour un utilisateur existant',
        description: 'Met à jour les informations d\'un utilisateur avec les données fournies',
    },
    responses: {
        '200': {
            description: 'Utilisateur mis à jour avec succès',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'ibsa6uz7iefqm15e1scfg0nh' },
                            username: { type: 'string', example: 'John Doe' },
                            createdAt: { type: 'string', format: 'date-time', example: '2024-10-30T13:39:10.154Z' },
                            updatedAt: { type: 'string', format: 'date-time', example: '2024-10-30T13:40:10.154Z' },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Erreur de validation des données',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', example: 'Les données fournies sont invalides' },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'Utilisateur non trouvé',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', example: 'Utilisateur non trouvé' },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Authentification requise',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', example: 'Authentification requise pour accéder à cette ressource.' },
                        },
                    },
                },
            },
        },
    },
    body: {
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'John Doe' },
                password: { type: 'string', format: 'password', example: 'newpassword123' },  // Optionnel, selon ta logique
            },
            required: ['username'],  // Définis ici les champs requis
        },
    },
};


export const createUserSwagger = {
    tags: ['users'],
    operation: {
        summary: 'Créer un nouvel utilisateur',
        description: 'Crée un nouvel utilisateur avec les informations fournies',
    },
    responses: {
        '201': {
            description: 'Utilisateur créé avec succès',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'ibsa6uz7iefqm15e1scfg0nh'},
                            username: { type: 'string', example: 'John Doe'},
                            password: { type: 'string', example: '$2b$10$YmiW2Jo11Cx1vfNoqdXEtOtnzv7Jnwfh9akAWnU5PPQtoG6c6k/eK' },
                            created_at: { type: 'string', format: 'date-time', example: '2024-10-30T13:39:10.154Z' },
                            updated_at: { type: 'string', format: 'date-time', nullable: true, example: null },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Erreur de validation des données',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', example: 'Les données fournies sont invalides'},
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Authentification requise',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', example: 'Authentification requise pour accéder à cette ressource.' },
                        },
                    },
                },
            },
        },
    },
    body: {
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'John Doe' },
                password: { type: 'string', format: 'password', example: 'password123'},
            },
            required: ['username', 'password'],
        },
    },
};


