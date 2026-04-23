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
    pgm.createTable('jobs', {
        id: { type: 'VARCHAR(50)', primaryKey: true },
        company_id: { type: 'VARCHAR(50)', notNull: true, references: '"companies"', onDelete: 'CASCADE' },
        category_id: { type: 'VARCHAR(50)', notNull: true, references: '"categories"', onDelete: 'SET NULL' },
        title: { type: 'VARCHAR(200)', notNull: true },
        description: { type: 'TEXT' },
        type: { type: 'VARCHAR(20)' },
        salary_min: { type: 'INTEGER' },
        salary_max: { type: 'INTEGER' },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('jobs');
};
