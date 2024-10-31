package trabalho.dev.web.model.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
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
            // Verificar se o item existe no banco de dados antes de removê-lo
            ItemDomain itemToRemove = entityManager.find(ItemDomain.class, item.getId());

            if (itemToRemove != null) {
                entityManager.remove(itemToRemove);
                return 1; // Remoção bem-sucedida
            } else {
                System.err.println("Item não encontrado para remoção com ID: " + item.getId());
                return -1; // Item não encontrado
            }
        } catch (Exception e) {
            System.err.println("Erro ao remover item: " + e.getMessage());
            e.printStackTrace();
            return -1; // Erro na remoção
        }
    }

    @Transactional
    public int editItem(ItemDomain item) {
        try {
            entityManager.merge(item);  // Substitui session.update(item)
            return 1;
        } catch (Exception e) {
            System.err.println("Erro ao editar item) " + e.getMessage());
            e.printStackTrace();
            return -1;
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
