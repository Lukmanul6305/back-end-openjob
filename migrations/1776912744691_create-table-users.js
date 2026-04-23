/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('users', {
        id: { type: 'VARCHAR(50)', primaryKey: true },
        name: { type: 'VARCHAR(100)', notNull: true },
        email: { type: 'VARCHAR(100)', notNull: true, unique: true },
        password: { type: 'TEXT', notNull: true },
        role: { type: 'VARCHAR(20)', notNull: true, default: 'jobseeker' },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users')
};
