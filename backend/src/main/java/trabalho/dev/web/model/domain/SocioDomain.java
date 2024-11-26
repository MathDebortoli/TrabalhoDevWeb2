package trabalho.dev.web.model.domain;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;


@JsonTypeName("socio")
@Entity (name="Socio")
public class SocioDomain extends ClienteDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true) // Relacionamento correto para múltiplos dependentes
    private List<DependenteDomain> dependentes;

    public SocioDomain() {
    }

    public SocioDomain(String nome, char sexo, String cpf, String rua, int numero, int telefone, Date dataNascimento) {
        super(nome, sexo, cpf, rua, numero, telefone, dataNascimento);
    }

    public List<DependenteDomain> getDependentes() {
        return dependentes;
    }

    public void setDependentes(List<DependenteDomain> dependentes) {
        this.dependentes = dependentes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
