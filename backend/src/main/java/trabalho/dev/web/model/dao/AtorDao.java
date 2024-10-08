package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trabalho.dev.web.model.domain.AtorDomain;

import java.util.List;

@Repository
public class AtorDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addAtor(AtorDomain ator) {
        try {
            entityManager.persist(ator);  // Substitui session.save(ator)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar ator: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeAtor(AtorDomain ator) {
        try {
            entityManager.remove(entityManager.contains(ator) ? ator : entityManager.merge(ator));  // Substitui session.remove(ator)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover ator: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int editAtor(AtorDomain ator) {
        try {
            entityManager.merge(ator);  // Substitui session.update(ator)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar ator: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<AtorDomain> getAtores() {
        try {
            return entityManager.createQuery("from AtorDomain ", AtorDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar atores: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
