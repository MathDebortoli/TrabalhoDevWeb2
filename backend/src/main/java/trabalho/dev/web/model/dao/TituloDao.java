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
            entityManager.persist(titulo);  // Substitui session.save(titulo)
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
            entityManager.remove(entityManager.contains(titulo) ? titulo : entityManager.merge(titulo));  // Substitui session.remove(titulo)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao remover titulo: " + e.getMessage());
            e.printStackTrace();
            return -1;
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
