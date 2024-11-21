package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import trabalho.dev.web.model.domain.SocioDomain;

import java.util.List;
@Repository
public class SocioDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addSocio(SocioDomain socio) {
        try {
            entityManager.merge(socio);  // Substitui session.save(socio)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar sócio: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeSocio(SocioDomain socio) {
        try {
            entityManager.remove(entityManager.contains(socio) ? socio : entityManager.merge(socio));  // Substitui session.remove(socio)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover sócio: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int editSocio(SocioDomain socio) {
        try {
            entityManager.merge(socio);  // Substitui session.update(socio)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar sócio: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<SocioDomain> getSocios() {
        try {
            return entityManager.createQuery("from Socio", SocioDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar sócios: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
