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
    pgm.createTable('applications', {
        id: { type: 'VARCHAR(50)', primaryKey: true },
        user_id: { type: 'VARCHAR(50)', notNull: true, references: '"users"', onDelete: 'CASCADE' },
        job_id: { type: 'VARCHAR(50)', notNull: true, references: '"jobs"', onDelete: 'CASCADE' },
        status: { type: 'VARCHAR(20)', notNull: true, default: 'pending' },
        cover_letter: { type: 'TEXT' },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
    });

    pgm.addConstraint('applications', 'unique_user_job', 'UNIQUE(user_id, job_id)');

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('applications');
};
