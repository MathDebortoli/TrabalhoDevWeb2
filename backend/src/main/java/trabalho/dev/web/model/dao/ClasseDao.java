package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trabalho.dev.web.model.domain.ClasseDomain;

import java.util.List;
@Repository
public class ClasseDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addClasse(ClasseDomain classe) {
        try {
            entityManager.merge(classe);  // Substitui session.save(ator)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar Classe: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeClasse(ClasseDomain classe) {
        try {
            entityManager.remove(entityManager.contains(classe) ? classe : entityManager.merge(classe));  // Substitui session.remove(Classe)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover Classe: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int editClasse(ClasseDomain classe) {
        try {
            entityManager.merge(classe);  // Substitui session.update(Classe)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar Classe: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<ClasseDomain> getClasse() {
        try {
            return entityManager.createQuery("from Classe", ClasseDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar Classees: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
