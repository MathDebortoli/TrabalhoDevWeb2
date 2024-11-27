package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.DependenteDao;
import trabalho.dev.web.model.domain.DependenteDomain;

import java.util.List;

@Service
public class DependenteApplication {

    private final DependenteDao dao;
    @Autowired
    public DependenteApplication(DependenteDao dao) {
        this.dao = dao;
    }


    public int addDependente(DependenteDomain dependente) {
        return dao.addDependente(dependente);
    }


    public int removeDependente(DependenteDomain dependente) {
        return dao.removeDependente(dependente);
    }


    public int editDependente(DependenteDomain dependente) {
        return dao.editDependente(dependente);
    }


    public List<DependenteDomain> getDependentes() {
        return dao.getDependentes();
    }


    public List<DependenteDomain> getDependentesPeloSocio(Long socioId) {
        return dao.getDependentesPeloSocio(socioId);
    }
}
