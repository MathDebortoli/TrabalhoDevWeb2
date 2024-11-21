package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.SocioDao;
import trabalho.dev.web.model.domain.SocioDomain;

import java.util.List;

@Service
public class SocioApplication {
    private final SocioDao dao;

    @Autowired
    public SocioApplication(SocioDao dao) {
        this.dao = dao;
    }

    public int addSocio(SocioDomain socio) {
        return dao.addSocio(socio);
    }

    public int removeSocio(SocioDomain socio) {
        return dao.removeSocio(socio);
    }

    public int editSocio(SocioDomain socio) {
        return dao.editSocio(socio);
    }

    public List<SocioDomain> getSocios() {
        return dao.getSocios();
    }
}
