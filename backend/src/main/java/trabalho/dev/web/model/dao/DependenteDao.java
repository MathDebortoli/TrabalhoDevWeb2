package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import trabalho.dev.web.model.domain.DependenteDomain;


import java.util.List;
@Repository
public class DependenteDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addDependente(DependenteDomain dependente) {
        try {
            entityManager.persist(dependente);  // Substitui session.save(dependente)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar dependente: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeDependente(DependenteDomain dependente) {
        try {
            entityManager.remove(entityManager.contains(dependente) ? dependente : entityManager.merge(dependente));  // Substitui session.remove(dependente)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover dependente: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int editDependente(DependenteDomain dependente) {
        try {
            entityManager.merge(dependente);  // Substitui session.update(dependente)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar dependente: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<DependenteDomain> getDependentes() {
        try {
            return entityManager.createQuery("from Dependente", DependenteDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar dependentes: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public List<DependenteDomain> getDependentesPeloSocio(Long socioId) { // Método para buscar dependentes pelo ID do sócio
        try {
            return entityManager.createQuery(
                    "SELECT d FROM Dependente d WHERE d.socio.id = :socioId", DependenteDomain.class
            ).setParameter("socioId", socioId).getResultList();
        } catch (Exception e) {
            System.err.println("Erro ao buscar dependentes pelo sócio: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
