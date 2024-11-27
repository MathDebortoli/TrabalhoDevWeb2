package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.LocacaoDao;
import trabalho.dev.web.model.domain.LocacaoDomain;

import java.util.List;

@Service
public class LocacaoApplication {

    private final LocacaoDao dao;

    @Autowired
    public LocacaoApplication(LocacaoDao dao) {
        this.dao = dao;
    }

    // Método para adicionar uma nova locação
    public int addLocacao(LocacaoDomain locacao) {
        return dao.addLocacao(locacao);
    }

    // Método para remover uma locação
    public int removeLocacao(LocacaoDomain locacao) {
        return dao.removeLocacao(locacao);
    }

    // Método para editar uma locação existente
    public int editLocacao(LocacaoDomain locacao) {
        return dao.editLocacao(locacao);
    }

    // Método para obter todas as locações
    public List<LocacaoDomain> getLocacoes() {
        return dao.getLocacoes();
    }
    public LocacaoDomain getLocacaoById(Long id) {
        return dao.findById(id);
    }
}
