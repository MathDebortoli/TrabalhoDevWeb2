package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import trabalho.dev.web.exceptions.ItemException;
import trabalho.dev.web.exceptions.ItemNotFoundException;
import trabalho.dev.web.model.domain.ItemDomain;
import trabalho.dev.web.model.domain.TituloDomain;

import java.util.List;

@Repository
public class ItemDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public int addItem(ItemDomain item) {
        try {
            // Verifique se o TituloDomain existe e se está sendo corretamente associado
            TituloDomain titulo = entityManager.find(TituloDomain.class, item.getTituloDomain().getId());
            if (titulo != null) {
                item.setTituloDomain(titulo); // Associar a entidade existente
            } else {
                System.err.println("Título não encontrado com o ID: " + item.getTituloDomain().getId());
                return -1; // Ou trate conforme necessário
            }

            entityManager.persist(item);
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao adicionar item: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
    }


    @Transactional
    public int removeItem(ItemDomain item) {
        try {
            // Verifica se o item com o ID especificado existe no banco de dados
            ItemDomain itemToRemove = entityManager.find(ItemDomain.class, item.getId());

            if (itemToRemove == null) {
                // Lança uma exceção específica se o item não for encontrado
                throw new ItemNotFoundException("Item não encontrado para remoção com ID: " + item.getId());
            }

            entityManager.remove(itemToRemove);
            return 1; // Remoção bem-sucedida

        } catch (ItemNotFoundException e) {
            System.err.println(e.getMessage());
            throw e; // Relança a exceção para que o handler capture e trate corretamente

        } catch (Exception e) {
            System.err.println("Erro ao remover item: " + e.getMessage());
            e.printStackTrace();
            // Lança uma exceção genérica encapsulando o erro original
            throw new ItemException("Erro ao remover item: " + e.getMessage());
        }
    }


    @Transactional
    public int editItem(ItemDomain item) {
        try {
            // Verifica se o item com o ID existe no banco de dados
            if (entityManager.find(ItemDomain.class, item.getId()) == null) {
                throw new ItemNotFoundException("Item não encontrado com ID: " + item.getId());
            }

            entityManager.merge(item); // Atualiza o item apenas se ele já existir
            return 1;
        } catch (ItemNotFoundException e) {
            System.err.println(e.getMessage());
            throw e;  // Relança a exceção para ser capturada pelo handler
        } catch (Exception e) {
            System.err.println("Erro ao editar item: " + e.getMessage());
            e.printStackTrace();
            throw new ItemException("Erro ao editar item: " + e.getMessage());  // Lança uma exceção genérica
        }
    }

    @Transactional
    public List<ItemDomain> getItens() {
        try {
            return entityManager.createQuery("from Item ", ItemDomain.class).getResultList();  // Substitui session.createQuery
        } catch (Exception e) {
            System.err.println("Erro ao buscar items: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
