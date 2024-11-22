package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import trabalho.dev.web.model.domain.LocacaoDomain;

import java.util.List;

@Repository
public class LocacaoDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Método para adicionar uma nova locação
    @Transactional
    public int addLocacao(LocacaoDomain locacao) {
        try {
            entityManager.merge(locacao);  // Substitui session.save(locacao)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar locação: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    // Método para remover uma locação
    @Transactional
    public int removeLocacao(LocacaoDomain locacao) {
        try {
            entityManager.remove(entityManager.contains(locacao) ? locacao : entityManager.merge(locacao));  // Substitui session.remove(locacao)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover locação: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    // Método para editar uma locação existente
    @Transactional
    public int editLocacao(LocacaoDomain locacao) {
        try {
            entityManager.merge(locacao);  // Substitui session.update(locacao)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar locação: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    // Método para obter todas as locações
    @Transactional
    public List<LocacaoDomain> getLocacoes() {
        try {
            return entityManager.createQuery("from locacao", LocacaoDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar locações: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
