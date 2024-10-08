package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.AtorDao;
import trabalho.dev.web.model.domain.AtorDomain;

import java.util.List;

@Service
public class AtorApplication {

    private final AtorDao dao;

    // Injeção de dependência usando @Autowired no construtor
    @Autowired
    public AtorApplication(AtorDao dao) {
        this.dao = dao;
    }

    public int addAtor(AtorDomain ator) {
        return dao.addAtor(ator);
    }

    public int removeAtor(AtorDomain ator) {
        return dao.removeAtor(ator);
    }

    public int editAtor(AtorDomain ator) {
        return dao.editAtor(ator);
    }

    public List<AtorDomain> getAtores() {
        return dao.getAtores();
    }
}
