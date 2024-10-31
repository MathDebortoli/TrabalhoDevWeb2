package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trabalho.dev.web.model.domain.TituloDomain;

import java.util.List;

@Repository
public class TituloDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addTitulo(TituloDomain titulo) {
        try {
            entityManager.merge(titulo);  // Substitui session.save(titulo)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar titulo: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public int removeTitulo(TituloDomain titulo) {
        try {
            // Verifica se a entidade está gerenciada
            if (entityManager.contains(titulo)) {
                // Se a entidade já estiver gerenciada, remove diretamente
                entityManager.remove(titulo);
            } else {
                // Caso contrário, você precisa buscar a entidade no banco de dados
                TituloDomain managedTitulo = entityManager.find(TituloDomain.class, titulo.getId());
                if (managedTitulo != null) {
                    entityManager.remove(managedTitulo);
                } else {
                    System.err.println("Título não encontrado para ID: " + titulo.getId());
                    return -1; // Título não encontrado
                }
            }
            return 1; // Sucesso na remoção
        } catch (Exception e) {
            System.err.println("Erro ao remover título: " + e.getMessage());
            e.printStackTrace();
            return -1; // Erro na remoção
        }
    }


    @Transactional
    public int editTitulo(TituloDomain titulo) {
        try {
            entityManager.merge(titulo);  // Substitui session.update(titulo)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar titulo: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public List<TituloDomain> getTitulos() {
        try {
            return entityManager.createQuery("from Titulo ", TituloDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar diretores: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
