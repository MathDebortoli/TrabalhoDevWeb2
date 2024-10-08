package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.AtorDao;
import trabalho.dev.web.model.dao.ClasseDao;
import trabalho.dev.web.model.domain.AtorDomain;
import trabalho.dev.web.model.domain.ClasseDomain;

import java.util.List;
@Service
public class ClasseApplication {
    private final ClasseDao dao;


    @Autowired
    public ClasseApplication(ClasseDao dao) {
        this.dao = dao;
    }

    public int addClasse(ClasseDomain ator) {
        return dao.addClasse(ator);
    }

    public int removeAtor(ClasseDomain ator) {
        return dao.removeClasse(ator);
    }

    public int editAtor(ClasseDomain ator) {
        return dao.editClasse(ator);
    }

    public List<ClasseDomain> getClasse() {
        return dao.getClasse();
    }
}
