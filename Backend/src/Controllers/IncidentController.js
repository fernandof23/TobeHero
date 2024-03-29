import connection from '../database/connection';

export default {
  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    try {
      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });

      return res.json({ id });
    } catch (err) {
      return res.status(err.status).send(err);
    }
  },

  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incident) {
      return res.json({ error: 'Incidente não existe' });
    }

    // eslint-disable-next-line eqeqeq
    if (incident.ong_id != ong_id) {
      return res.status(401).json({ error: 'Opration not permitted' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  },
};
