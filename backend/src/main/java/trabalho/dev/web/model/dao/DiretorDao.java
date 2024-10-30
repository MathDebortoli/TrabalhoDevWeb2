package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trabalho.dev.web.model.domain.DiretorDomain;

import java.util.List;

@Repository
public class DiretorDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addDiretor(DiretorDomain diretor) {
        try {
            entityManager.persist(diretor);  // Substitui session.save(diretor)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar diretor: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeDiretor(DiretorDomain diretor) {
        try {
            entityManager.remove(entityManager.contains(diretor) ? diretor : entityManager.merge(diretor));  // Substitui session.remove(diretor)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover diretor: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int editDiretor(DiretorDomain diretor) {
        try {
            entityManager.merge(diretor);  // Substitui session.update(diretor)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar diretor: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<DiretorDomain> getDiretores() {
        try {
            return entityManager.createQuery("from Diretor ", DiretorDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar diretores: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}

