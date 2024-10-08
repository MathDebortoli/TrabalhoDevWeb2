package trabalho.dev.web.model.application;


import trabalho.dev.web.model.dao.AtorDao;
import trabalho.dev.web.model.domain.AtorDomain;

import java.util.List;

public class AtorApplication {
    private AtorDao dao = null;

    public AtorApplication() {
        dao = new AtorDao();
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
