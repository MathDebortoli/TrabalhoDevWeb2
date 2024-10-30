package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.ClasseDao;
import trabalho.dev.web.model.domain.ClasseDomain;

import java.util.List;
@Service
public class ClasseApplication {
    private final ClasseDao dao;


    @Autowired
    public ClasseApplication(ClasseDao dao) {
        this.dao = dao;
    }

    public int addClasse(ClasseDomain classe) {
        return dao.addClasse(classe);
    }

    public int removeClasse(ClasseDomain classe) {
        return dao.removeClasse(classe);
    }

    public int editClasse(ClasseDomain classe) {
        return dao.editClasse(classe);
    }

    public List<ClasseDomain> getClasse() {
        return dao.getClasse();
    }
}
